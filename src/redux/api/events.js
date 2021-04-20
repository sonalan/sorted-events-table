const baseUrl = 'https://oll-coding-exercise.s3-us-west-2.amazonaws.com';

export const getFromApi = endPoint => {
    return fetch(`${baseUrl}${endPoint}`)
            .then(response=>{
                return response.json();
            })
            .catch((error) => {throw error})
}