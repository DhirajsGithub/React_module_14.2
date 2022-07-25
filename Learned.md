# Meetup page with NextJS

we can also create dynamic page as we created dynaminc file name 

## _app.js file
it's a special file, since we don't have index.html file in NextJS the _app.js is responsible to render all components and pageProps
<br>
the common styling we can to add to app pages and component inside pages can be applied tp _app.js file

### aadat
make pages files only of .js content, use styling to the component only in component folder with file.module.css

## pre-rendering 
if we fetch data from backend by simply using useEffect() hook then the page at the first render conatains empty data which is not good for SEO again then after data is shown at the page

# getStaticProps(SSR) & static side generation(SSG)
If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by


## showing pre-rendering without getStaticProps and with getStaticProps function
![](public/showing%20pre-rendering.png)

## the revalidate property :
you can ensure that this page is also updated regularly after deployment.
<br>
since we are using getStaticProps the data pre-render will be outdated to update the data with time or pre-render the updated page  we use revalidate property
HTML and JSON files, both of which can be cached by a CDN for performance

## getServerSideProps() function
If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.
autherization or geo location can be done with this function

<hr>
Note that irrespective of rendering type, any props will be passed to the page component and can be viewed on the client-side in the initial HTML. This is to allow the page to be hydrated correctly. Make sure that you don't pass any sensitive information that shouldn't be available on the client in props.
<hr>

# getStaticPaths() function
If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes and:
<br>

### the fallback key 
If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
<br>
The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
<br>
If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.



<hr>

## wroking with api
* need api folder inside pages folder
* api folder must contain files which exports functions that hold our data which will trigger on certain endpoints
* the file code will be never run on client side, it will only be run on server side

## the Head tag from next/head allow us to add metatags/title/description for SEO, since we don't have an index.html in nextjs propject

## deplying you NextJS app
https://vercel.com/#get-started
<br>
add your code to github with git push --all
<br>
network access in mongodb must be access from anywhere or ipaddress : 0.0.0.0/0  