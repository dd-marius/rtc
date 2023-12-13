import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useAuthContext } from '@/features/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';
import { DialogConfirm } from "@/components/DialogConfirm/DialogConfirm";


const schemaProfile = z.object({
    tag: z.string().min(3, {
        message: "Prescurtarea trebuie sa aiba minim 3 caractere.",
    }),  
    address: z.string().min(10, {
        message: "Adresa trebuie sa aiba minim 10 caractere.",
    }),  
    city: z.string().min(3, {
        message: "Numele orasului trebuie sa aiba minim 3 caractere.",
    }),
    county: z.string().min(2, {
        message: "Numele judetului trebuie sa aiba minim 3 caractere.",
    }),
    phoneNo: z.string().min(10, {
        message: "Numarul de telefon trebuie sa aiba minim 10 caractere.",
    }),  

  });


const defaultDomState = {
    isVisible: false,
    keySelected: 0,
    buttonText: "Adauga"
}

export function ProfileAddress() {
    const [ dataAddresses, setDataAddresses] = useState(null);
    const [ selectKey, setSelectKey] = useState(0);
    const [ domState, setDomState] = useState(defaultDomState);
    const triggerRef = useRef(false);
    const { get, post, patch, remove } = useApi('userAddress');
    const { user, accessToken } = useAuthContext();
    const { toast } = useToast();
    
    useEffect(() => {
        async function getDataAddresses() {
          const data = await get({ userId: user?.id }, null, { accessToken });
          setDataAddresses(data);
        }
        getDataAddresses();
        // HACK: Using triggerRef.current to force trigger of useEfect here to refresh data from API
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, user, get, triggerRef.current]);

    const form = useForm({
        resolver: zodResolver(schemaProfile),
        defaultValues: {
            address: "",
            city: "",
            county: "",
            phoneNo: ""
        },
    })

    async function handleSubmit(values) {
        if ( domState.keySelected > 0 )
        {
            //WARNING: Because json-server has no built-in protection for routes you can modify data for other users! DO NOT USE THIS IN PRODUCTION!
            const idPatch = domState.keySelected;
            const data = await patch(idPatch, values, { accessToken });
            //TODO: Handle errors
            toast({ 
                title: "Notificare:",
                description: "Adresa a fost modificata cu succes!"
            });
        } else {
            const newAddress = {...values, userId: user.id};
            const data = await post(newAddress, { accessToken });
            //TODO: Handle errors
            toast({ 
                title: "Notificare:",
                description: "Noua adresa a fost adaugata cu succes!"
            });
        }
        handleHideForm();
        // Trigger useEffect refresh to update data via API
        triggerRef.current = !triggerRef.current;
    }

    function handleSelectValueChange(value) {
        const itemSelected = dataAddresses.find(item => item.id === value);
        if (itemSelected) {
            form.setValue("tag", itemSelected.tag);
            form.setValue("address", itemSelected.address);
            form.setValue("city", itemSelected.city);
            form.setValue("county", itemSelected.county);
            form.setValue("phoneNo", itemSelected.phoneNo);
        }
        setDomState({ isVisible: true, buttonText: "Modifica", keySelected: value });
    }

    function handleButtonAdd() {
        clearForm();
        setDomState({ isVisible: true, buttonText: "Adauga", keySelected: 0 });
        setSelectKey(prevKey => prevKey + 1); // HACK: Increment the key to force remount (UI: Refresh list)
    }

    async function handleActionDelete() {
        //WARNING: Because json-server has no built-in protection for routes you can modify data for other users! DO NOT USE THIS IN PRODUCTION!
        const idDelete = domState.keySelected;
        const data = await remove(idDelete, { accessToken });
        //TODO: Handle errors
        toast({ 
            title: "Notificare:",
            description: "Adresa a fost stearsa!"
        });
        handleHideForm();
        // Trigger useEffect refresh to update data via API
        triggerRef.current = !triggerRef.current;
    }

    function handleHideForm() {
        clearForm();
        setDomState({ isVisible: false});
        setSelectKey(prevKey => prevKey + 1);
    }

    function clearForm() {
        form.setValue("tag","");
        form.setValue("address","");
        form.setValue("city","");
        form.setValue("county","");
        form.setValue("phoneNo","");
    }


    return (
    <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Adrese pentru livrare:</h1>

        <div className="flex items-center space-x-4 w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
            { dataAddresses && dataAddresses?.length !== 0 && (
            <Select onValueChange={handleSelectValueChange} key={selectKey}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Va rugam selectati o adresa din lista" />
            </SelectTrigger>
            <SelectContent>
                { dataAddresses && dataAddresses?.length !== 0 &&
                dataAddresses.map((element) => (
                <SelectItem key={element.id} value={element.id}>{element.tag}</SelectItem>
                ))}
            </SelectContent>
            </Select>
            )}
            <Button onClick={handleButtonAdd}>Adauga adresa noua</Button>
            <div className="flex-grow"></div>
            <Button disabled={ ! domState.isVisible } onClick={handleHideForm}>Ascunde</Button>
        </div>
        
        { domState.isVisible && (
        <div className="flex items-center space-x-4 w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Prescurtare:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Adresa:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Oras:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Judet:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Numar de telefon:</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-between">
                <Button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">{domState.buttonText}</Button>
                { domState.keySelected !== 0 && (
                <DialogConfirm 
                    onAction={handleActionDelete} 
                    customTitle="Confirmare"
                    customDescription="Sunteti sigur ca doriti sa stergeti adresa selectata?">
                    <Button type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Sterge</Button>
                </DialogConfirm>
                )}
            </div>
        </form>
        </Form>
        </div>
        )}
    </div>        
    )
}