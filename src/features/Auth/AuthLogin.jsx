import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useAuthContext } from '@/features/Auth/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})


export function AuthLogin() {
  const { state } = useLocation();
  const { toast } = useToast();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const dataForServer = {...values}
    // Try to login via API POST
    // REFACTOR: Move this to utils/API
    const data = await fetch(
      `${apiUrl}/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(dataForServer),
      }
    ).then(async (res) => {
      // Handle response types
      const data = await res.json();
      if ( res.status == 400 ) { 
        toast({ 
          variant: "destructive",
          title: "Error!",
          description: data });
          return;
      } else if ( res.status != 200 ) { 
        toast({ 
          variant: "destructive",
          title: "Error!",
          description: "There was a problem with your request.",});
          return;
      } else { return data; }
    });
    
    // If we have an access token we save it to local storage
    if (data?.accessToken) {
      // Login (save to local storage)
      login(data);
      // Navigate to previous page if available
      const path = state?.from ?? '/';
      navigate(path);
    }
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Autentificare</h1>
      <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresa de email:</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola:</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Autentificare</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}