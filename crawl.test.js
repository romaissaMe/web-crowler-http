import {normalizeUrl} from './crawl'
import {getURLFomHTML} from './crawl'

test('normalize strip http',()=>{
    const input = 'https://blog.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.dev/path';
    expect(actual).toEqual(expected);
})

test('test get urls',()=>{
const baseUrl='https://blog.dev'
const expected= ['https://blog.dev/path1','https://blog.dev/path2']
const htmlCode=`
<html>
    <body>
        <a href="https://blog.dev/path1"> blog dev path1 <a/>
        <a href="/path2"> blog dev path2 <a/>
    <body/>
<html/>
`
const actual=getURLFomHTML(htmlCode,baseUrl)
expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLFomHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLFomHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })