
export const githubSearch = async (query: string) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    if (!response.ok) throw new Error('Error al buscar en GitHub');
    const data = await response.json();
    return data.items;
}