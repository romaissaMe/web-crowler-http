import {crawlPage,print} from './crawl.js'
function main(){
    print()
    if(process.argv.length<3){
        console.log('no website provided')
        process.exit(1)
    }
    if(process.argv.length>3){
        console.log('too many command line arguments')
        process.exit(1)
    }
    else{
        const baseUrl=process.argv[2]
        console.log(`crawling started of ${baseUrl}`)
        const pages=  crawlPage(baseUrl,baseUrl,{})
        console.log(pages)
    }
}

main()