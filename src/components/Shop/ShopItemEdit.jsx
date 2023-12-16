import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as y from "yup"

import { useAuthContext } from '@/features/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';

const categories = [
  { id: 1, name: 'Ceai' },
  { id: 2, name: 'Cafea' },
];

const itemSchema = y.object({
  name: y.string().required('Va rugam introduceti un nume pentru produs.').min(5),
  content: y.string().required('Va rugam introduceti o descriere pentru produs.').min(10),
  stock: y.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .typeError('Valoarea introdusa trebuie sa fie un numar.')
    .required('Va rugam introduceti o contitate pentru stocul disponibil.'),
  price: y.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .typeError('Valoarea introdusa trebuie sa fie un numar.')
    .required('Va rugam introduceti un pret pentru produs.'),
  promoted: y.boolean(),
  type: y.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .oneOf(categories.map(category => category.id), 'Va rugam selectati o categorie pentru acest produs.')
    .required('Selectarea unei categorii pentru produs este obligatire.'),
  picture: y.string()
    .test('has-valid-path', 'Adresa pentru imagine este incorecta', (value) => {
      const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|svg)$/i;
      const localPathRegex = /^\/[^\s]*\.(jpg|jpeg|png|gif|bmp|svg)$/i; 
      return urlRegex.test(value) || localPathRegex.test(value);
    })
    .required('Va rugam adaugati o imagine valida pentru produs.'),  
});


export function ShopItemEdit() {
  const { user, accessToken } = useAuthContext();
  const { id } = useParams();
  const { get, post, patch, remove } = useApi('shop');
  const [ item, setItem] = useState(null);
  const [ imagePreview, setImagePreview ] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(itemSchema),
  });

  // Fetch data if we get an ID as param
  useEffect(() => {
    async function getData() {
      const data = await get(null, id);
      setItem(data);
    }
    // Only fetch data if we are in Edit mode
    if (id) {
      getData();
    } 
  }, [id, get]);

  // Update form when we get data via API
  useEffect(() => {
    const updateFormFields = (data) => {
      for (const key in data) {
        setValue(key, data[key]);
      }
    };
    updateFormFields(item);
  }, [item, setValue]);

  // Preview product image
  const picture = watch('picture');
  useEffect(() => {
    function validatePicture(value) {
      // HACK: Because itemSchema.validateAt does not work...
      const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|svg)$/i;
      const localPathRegex = /^\/[^\s]*\.(jpg|jpeg|png|gif|bmp|svg)$/i;
      if (!urlRegex.test(value) && !localPathRegex.test(value)) return false;    
      return true;
    }

    if ( validatePicture(picture) === true ) {
      setImagePreview(picture);
    } else {
      setImagePreview(null);
    }  
  }, [picture]);

  async function onSubmit(values) {
    // Trivial role control to only allow "admins" to make modifications
    if ( user.role != 1 ) {
      toast.error("Nivelul de acces al utilizatorului dvs. nu va permite sa faceti modificari.");
      return;
    }
    // If we have a valid id it means we are in "edit mode"
    if (id) {
      console.log("Modificare");
      const idPatch = item.id;
      const data = await patch(idPatch, values, { accessToken });
      if (data != null) {
        toast.success("Produsul a fost modificat cu succes!");
        navigate(`/shop/${id}`);
      } else {
        toast.error("A aparut o eroare!");
      }
    } else {
      console.log("Adaugare");
      const data = await post(values, { accessToken });
      if (data != null) {
        toast.success("Produsul a fost adaugat cu succes!");
        navigate(`/shop/${data.id}`);
      } else {
        toast.error("A aparut o eroare!");
      }
      console.log(data);
    }
  }


  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 pt-4">
        {id && (`Editare produs #${id}`)}
        {!id && (`Adaugare produs nou`)}
      </h1>
      <div className="w-full md:w-1/2 h-auto bg-white p-4 shadow-lg">
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
   
        <label 
          htmlFor="type" 
          className="block text-sm font-medium text-gray-700">
          Selectati o categorie:
        </label>
        <select
          id="type"
          name="type"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          {...register('type')} >
          <option value="" disabled>Va rugam selectati o categorie</option>
          {categories.map((type) => (
            <option key={type.id} value={type.id}> {type.name} </option>
          ))}
        </select>
        {errors.type && ( <p className="text-red-500 text-xs italic">{errors.type.message}</p> )}

        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700" >
          Nume produs:</label>
        <input
          id="name" 
          type="text" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          {...register('name')} />
        {errors.name && ( <p className="text-red-500 text-xs italic" >{errors.name.message}</p> )}
   
        <label 
          htmlFor="content" 
          className="block text-sm font-medium text-gray-700">
          Descriere produs:</label>
        <textarea 
          id="content"
          rows="4"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          {...register('content')} />
        {errors.content && ( <p className="text-red-500 text-xs italic">{errors.content.message}</p> )}
   
        <label 
          htmlFor="stock" 
          className="block text-sm font-medium text-gray-700">
          Stoc produs (cantitate disponibila):</label>
        <input 
          id="stock" 
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          {...register('stock')} />
        {errors.stock && ( <p className="text-red-500 text-xs italic">{errors.stock.message}</p> )}
   
        <label 
          htmlFor="price" 
          className="block text-sm font-medium text-gray-700">
          Pret produs (per kg):</label>
        <input 
          id="price" 
          type="text" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
          {...register('price')} />
        {errors.price && ( <p className="text-red-500 text-xs italic">{errors.price.message}</p> )}

        <label 
          htmlFor="promoted" 
          className="block text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          id="promoted"
          className="form-checkbox h-5 w-5 text-blue-600"
          {...register('promoted')
        }
        />
        <span className="ml-2">Promoveaza acest produs pe prima pagina?</span></label>

        <label 
          htmlFor="picture" 
          className="block text-sm font-medium text-gray-700">
          Imagine produs:</label>
        <input
          id="picture"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          {...register('picture')} />
        {errors.picture && ( <p className="text-red-500 text-xs italic">{errors.picture.message}</p> )}

       {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          className="mt-2 w-60 h-60 object-cover rounded-lg mx-auto"
        />
        )}
        <div className="flex justify-center border-t border-dashed border-gray-300 pt-4 mt-4">
          <button type="submit" 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
            {id && (`Salveaza modificarile`)}
            {!id && (`Adauga produs`)}
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}