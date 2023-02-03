const {JSDOM}=require('jsdom')
function normalizeUrl(url){
    const urlObj = new URL(url);
    const newUrl= `${urlObj.hostname}${urlObj.pathname}`;
    if(newUrl.length>0 && newUrl.slice(-1)==='/'){
        return newUrl.slice(0,-1);
    } 
    return newUrl;
}

function getURLFomHTML(htmlBody,baseUrl){
    const urls=[]
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for (const link of links){
        //test if link relative
        if(link.href.slice(0,1)==='/'){
            try{
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with relative url ${err.message}`)
            }
        }
        //absolute
        else{
            try{
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with absolute utl ${err.message}`)
            }
            
        }  
    }
    return urls
}

module.exports= {normalizeUrl,
    getURLFomHTML}