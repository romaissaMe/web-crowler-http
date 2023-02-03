import {JSDOM} from 'jsdom'
import fetch from 'node-fetch'
export function normalizeUrl(url){
    const urlObj = new URL(url);
    const newUrl= `${urlObj.hostname}${urlObj.pathname}`;
    if(newUrl.length>0 && newUrl.slice(-1)==='/'){
        return newUrl.slice(0,-1);
    } 
    return newUrl;
}

export function getURLFomHTML(htmlBody,baseUrl){
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
export async function crawlPage(currentUrl){
    console.log(`currently crawling page ${currentUrl}`)
    try{
        const data = await fetch(currentUrl)
        if(data.status>399){
            console.log(`error in fetch with status code ${data.status} on page ${currentUrl}`)
            return
        }
        const contentType=data.headers.get('content-type')
        if(!contentType.includes('html/text')){
            console.log(`error the content type is ${contentType}`)
            return
        }
        console.log(await data.text())
    }
    catch(err){
        console.log(`error at fetching data ${err.message}`)
    }
    
    
}

export function print(){
    console.log('for test')
}