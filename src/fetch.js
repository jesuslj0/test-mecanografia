//Función para buscar un texto nuevo
const QuotesURL = "https://api.api-ninjas.com/v1/quotes"
const ApiKey = "BUEysPvUxCnPxZP5oM/xsA==3CoXtxtlSQ6NO3xa"

const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': ApiKey,
  };

const options = {
    method: "GET",
    headers: headers,
}

export const getQuote = async () => {
  try {
      const response = await fetch(QuotesURL, options);
      
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);
      return data[0];
      
  } catch (error) {
      console.error('Hubo un problema con la solicitud fetch:', error);
      return null;
  }
}
