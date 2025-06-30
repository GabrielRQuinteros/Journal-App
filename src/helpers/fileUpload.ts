import type { UploadImageResponse } from "../api/cloudinary";

/// CONSTANTES VARIABLES DE ENTORNO DE Cloudinary///
const cloudName = 'dqpbdeqj9';
const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1`;
const actionUpload = 'upload';

/// FUNCIONES PRIVADAS ///
/** Función que construye la URL para subir una imagen a Cloudinary
 * @returns 
 */
const getUploadUrl = (): string => {
    return `${cloudinaryBaseUrl}/${cloudName}/${actionUpload}`;
}

/// FUNCIONES HELPERS ///
/** Función que sube una Imagen a Cloudinary
 * @param file 
 * @returns 
 */
export const fileUpload = async (  file: File ): Promise <string | null> => {
    try {
        if( !file ) throw new Error('El archivo suministrado no existe.');

        const formData: FormData = new FormData();
        formData.append( 'upload_preset', 'react-journal' );
        formData.append( 'file', file );
    
        const response: Response = await fetch( getUploadUrl(), {
            method: 'POST',
            body: formData,
        } );

        if( ! response.ok )
            throw new Error('Ha ocurrido un error al intentar persistir el archivo.');

        const { secure_url }: UploadImageResponse = await response.json() as UploadImageResponse;
        return secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
}


