/**
 * Fetch funktion
 * @param {*} endpoint URL til API
 * @returns Data objekt
 */
export const myFetch = async (endpoint) => {
    try {
        const respone = await fetch(endpoint)
        if (respone.ok) {
            return await respone.json()
        }
    } catch (error) {
        console.error(`Fejl i fetch funktion: ${error}`)
    }
}