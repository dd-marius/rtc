import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuthContext } from '@/features/Auth/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

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


const schemaProfile = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    nameFirst: z.string().min(3, {
        message: "FirstName must be at least 3 characters.",
    }),  
    nameLast: z.string().min(3, {
        message: "LastName must be at least 3 characters.",
    }),
    newPassword: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }).optional().or(z.literal('')),
    newPasswordConfirm: z.string().min(3, {
        message: "Password must be at least 3 characters.",
    }).optional().or(z.literal(''))
  }).refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "New password does not match!",
    path: ["newPasswordConfirm"],
});
 

export function Profile() {
    const { user, accessToken, login } = useAuthContext();
    const { toast } = useToast();

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
            toast({ 
                title: "Notification:",
                description: "No changes have been detected in your profile information."
            });
            return;
        }
        
        // REFACTOR: Move this to utils/API
        const data = await fetch(
            `${apiUrl}/users/${user.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
                return false;
            } else if ( res.status != 200 ) { 
                toast({ 
                variant: "destructive",
                title: "Error!",
                description: "There was a problem with your request.",});
                return false;
            } else { 
                return data; 
            } 
        });

        // If we have data here we need to update context
        if (data !== false) {
            // Update login data in localstorage (profile information has changed)
            // REFACTOR: Make a dedicated function to update profile info?
            login({ 
                accessToken: accessToken,
                user: data,
            });
            // Notify user
            toast({ 
                title: "Success!",
                description: "Your profile information has been succesfully updated."
            });
        }
    }

    return (
    <div className="flex flex-col items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <p>User information:</p>
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
                    <FormLabel>First name:</FormLabel>
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
                    <FormLabel>Last name:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <p>Change password:</p>
            <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>New password:</FormLabel>
                    <FormControl>
                    <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Please type your new password.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="newPasswordConfirm"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Retype your new password:</FormLabel>
                    <FormControl>
                    <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Please confirm your new password.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit">Update profile</Button>
        </form>
        </Form>
        </div>
    </div>        
    )
}