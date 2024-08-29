import httpRequest from '~/utils/httpRequest';

export const fnGetAllMenu = async () => {
    const query = `
        query {
            menu {
                raw_content
            }
        }
    `;
    return await httpRequest.post('', { query });
};
