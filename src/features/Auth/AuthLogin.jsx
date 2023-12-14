import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

import { useAuthContext } from '@/features/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';

// Controled via ENV to increase global verbosity
const v = Number(import.meta.env.VITE_UX_VERBOSITY)


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
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { post } = useApi('login');

  const form = useForm({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const dataForServer = {...values};
    const data = await post(dataForServer);
    
    // If we have an access token we save it to local storage (login has been succesful)
    if (data?.accessToken) {
      v && toast.success("Autentificare reusita!");
      // Login (save to local storage)
      login(data);
      // Navigate to previous page if available
      const path = state?.from ?? '/';
      navigate(path);
    }
  }

  return (
    <div className="flex flex-col items-center">
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
            <div className="flex justify-center">
              <Button type="submit">Autentificare</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}