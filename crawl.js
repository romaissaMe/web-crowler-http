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
export async function crawlPage(baseUrl,currentUrl,pages){
    const currentUrlObj=new URL(currentUrl)
    const baseUrlObj = new URL(baseUrl)
    if(currentUrlObj.hostname !== baseUrlObj.hostname){
        return pages
    }
    const normalizedUrl=normalizeUrl(currentUrl)
      // if we've already visited this page
      // just increase the count and don't repeat
    if (pages[normalizedUrl] > 0){
        pages[normalizedUrl]++
        return pages
    }
      // initialize this page in the map
      // since it doesn't exist yet
    pages[normalizedUrl] = 1
    console.log(`currently crawling page ${currentUrl}`)
    let htmlBody=``
    try{
        const data = await fetch(currentUrl)
        if(data.status>399){
            console.log(`error in fetch with status code ${data.status} on page ${currentUrl}`)
            return pages
        }
        const contentType=data.headers.get('content-type')
        if(!contentType.includes('html/text')){
            console.log(`error the content type is ${contentType}`)
            return pages
        }
            htmlBody=await data.text()
    }
    catch(err){
        console.log(`error at fetching data ${err.message}`)
    }
    const links = getURLFomHTML(htmlBody,baseUrl)
        for (const link of links){
            pages= await crawlPage(baseUrl,link,pages)
        }
    return pages
}

export function print(){
    console.log('for test')
}