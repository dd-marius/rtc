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
  FormDescription,
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


const schemaRegister = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  retypePassword: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  nameFirst: z.string().min(3, {
    message: "FirstName must be at least 3 characters.",
  }),  
  nameLast: z.string().min(3, {
    message: "LastName must be at least 3 characters.",
  })
}).refine((data) => data.password === data.retypePassword, {
  message: "Passwords don't match",
  path: ["retypePassword"],
});


function AuthLogin(state) {
  const { toast } = useToast()  
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
          description: data }) 
      } else if ( res.status != 200 ) { 
        toast({ 
          variant: "destructive",
          title: "Error!",
          description: "There was a problem with your request.",}) 
      } else { return data; }
    });
    // Double check to make sure we got an access token
    if (!data.accessToken) {
      toast({ 
        variant: "destructive",
        title: "Error!",
        description: "Unable to generate session token.",}) 
      return;
    }
    // Login (save to local storage)
    login(data);
    // Navigate to previous page if available
    const path = state?.from ?? '/';
    navigate(path);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </>
  )
}

function AuthRegister() {
  const form = useForm({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",
      retypePassword: "",
      nameFirst: "",
      nameLast: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>This is your email address (used to login).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retype password:</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormDescription>Please type your password again.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameFirst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Please provide your First Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameLast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Please provide your Last Name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  )
}

export function Auth() {
    const { pathname, state } = useLocation();
    let isRegister = false;
    if (pathname === '/register') {
      isRegister = true;
    }

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h1>
        <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        {isRegister ? AuthRegister() : AuthLogin(state)}
        </div>
      </div>
    )
}