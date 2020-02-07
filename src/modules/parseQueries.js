const parseQueries = str => {
    const queries = (str[0] === '?' ? str.substring(1) : str).split('&');
    return queries.reduce((acc, query) => {
        query = query.split('=');
        if(query[1] === 'true'){
            query[1] = true;
        }
        else if(query[1] === 'false'){
            query[1] = false;
        }
        else if(!isNaN(query[1])){
            query[1] = Number(query[1]);
        }

        if(query[0] && query[0] !== '') acc[query[0]] = (query[1] || true);

        return acc;
    }, {});
}

export default parseQueries;