import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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

import { useAuthContext } from '@/features/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';

// Controled via ENV to increase global verbosity
const v = Number(import.meta.env.VITE_UX_VERBOSITY)


const schemaRegister = z.object({
  email: z.string().email({
    message: "Va rugam introduceti o adresa de email valida.",
  }),
  password: z.string().min(3, {
    message: "Parola trebuie sa contina minim 3 caractere.",
  }),
  retypePassword: z.string().min(3, {
    message: "Parola (pentru confirmare) trebuie sa contina minim 3 caractere.",
  }),
  nameFirst: z.string().min(3, {
    message: "Prenumele trebuie sa contina minim 3 caractere.",
  }),  
  nameLast: z.string().min(3, {
    message: "Numele trebuie sa contina minim 3 caractere.",
  })
}).refine((data) => data.password === data.retypePassword, {
  message: "Parola trebuie sa fie identica in ambele campuri!",
  path: ["retypePassword"],
});


export function AuthRegister() {
    const { post } = useApi('register');
    const { state } = useLocation();
    const { login } = useAuthContext();
    const navigate = useNavigate();
  
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
    
    async function onSubmit(values) {
      // eslint-disable-next-line no-unused-vars
      const { retypePassword, ...dataForServer } = values;
      // Append default role for new users
      dataForServer.role = 2;
      
      const data = await post(dataForServer);
    
      // If we have an access token we save it to local storage (registration has been succesful)
      if (data?.accessToken) {
        v && toast.success("Inregistrare reusita!");
        // Login (save to local storage)
        login(data);
        // Navigate to previous page if available
        // TODO: Redirect to onboard page?
        const path = state?.from ?? '/';
        navigate(path);
      }
    }


    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Inregistrare</h1>
        <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Adresa de e-mail:</FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Veti folosi aceasta adresa de e-mail ca sa va autentificati.</FormDescription>
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
                <FormDescription>Veti folosi aceasta parola ca sa va autentificati.</FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Confirmare parola:</FormLabel>
                <FormControl>
                <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormDescription>Va rugam introduceti parola din nou pentru verificare.</FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="nameFirst"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Prenume:</FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Va rugam introduceti Prenumele in acest camp.</FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="nameLast"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Nume:</FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Va rugam introduceti Numele in acest camp.</FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="border-t border-dashed border-gray-300 w-full my-4"></div>
        <div className="flex justify-center">
          <Button type="submit">Inregistrare</Button>
        </div>
        </form>
        </Form>
        </div>
      </div>
    )
}