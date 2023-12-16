import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useApi } from '@/hooks/useApi';
import { useAuthContext } from '@/features/Auth/AuthContext';


const schemaProfile = z.object({
    email: z.string().email({
        message: "Va rugam introduceti o adresa de e-mail valida.",
    }),
    nameFirst: z.string().min(3, {
        message: "Prenumele trebuie sa contina minim 3 caractere.",
    }),  
    nameLast: z.string().min(3, {
        message: "Numele trebuie sa contina minim 3 caractere.",
    }),
    newPassword: z.string().min(3, {
        message: "Parola trebuie sa contina minim 3 caractere.",
    }).optional().or(z.literal('')),
    newPasswordConfirm: z.string().min(3, {
        message: "Parola (pentru confirmare) trebuie sa contina minim 3 caractere.",
    }).optional().or(z.literal(''))
  }).refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Va rugam verificati ca parola noua sa corespunda in ambele campuri.",
    path: ["newPasswordConfirm"],
});
 

export function ProfileSettings() {
    const { user, accessToken, login } = useAuthContext();
    const { patch } = useApi('users');

    const form = useForm({
        resolver: zodResolver(schemaProfile),
        defaultValues: {
          email: user.email,
          nameFirst: user.nameFirst,
          nameLast: user.nameLast,
          newPassword: "",
          newPasswordConfirm: "",
        },
    })

    async function onSubmit(values) {
        let dataForServer = {};
        // Check if there were any changes made to user profile information
        if ( values.email != user.email ) { dataForServer.email = values.email; }
        if ( values.nameFirst != user.nameFirst ) { dataForServer.nameFirst = values.nameFirst; }
        if ( values.nameLast != user.nameLast ) { dataForServer.nameLast = values.nameLast; }
        if ( values.newPassword?.length > 3 )  { dataForServer.password = values.newPassword; }

        // Check if we have any changes to the profile data
        if ( Object.keys(dataForServer).length === 0 ) {
            toast.info("Nu a fost detectata nici o schimbare la profilul dvs.")
            return;
        }

        const data = await patch(user.id, dataForServer, { accessToken });

        // If we have data here we need to update context
        if (data != null) {
          // Update login data in localstorage (profile information has changed)
          login({ 
              accessToken: accessToken,
              user: data,
          });
          // Notify user
          toast.success('Informatiile dvs. au fost modificate cu succes.');
        } else {
          // toast.error('A aparut o eroare!');
        }
    }

    return (
    <div className="flex flex-col items-center">
        <h1 className="mt-4 text-2xl font-bold mb-4">Profil utilizator:</h1>

        <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <p>Informatii generale:</p>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
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
                    <FormMessage />
                </FormItem>
                )}
            />
            <p>Schimbare parola:</p>
            <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Parola noua:</FormLabel>
                    <FormControl>
                    <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Va rugam introduceti parola noua!</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="newPasswordConfirm"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirmare parola noua:</FormLabel>
                    <FormControl>
                    <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Va rugam introduceti parola noua din nou pentru confirmare.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit">Salveaza modificarile</Button>
        </form>
        </Form>
        </div>
    </div>        
    )
}