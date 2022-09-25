import React from 'react'
import bathroomHero from '../assets/bathroom/vanity1.jpg'
import wholeHome from '../assets/wholeHome.png'
import stone from '../assets/landscaping/stone1.jpg'
import basement from '../assets/den/den1.jpg'
import deck from '../assets/deck.webp'
import kitchen from '../assets/kitchenHero.jpg'


export default function Gallery() {
  return (
    <div>
        <p className='pt-24 text-2xl'>| Our Services |</p>
        <div className='flex flex-col md:grid grid-cols-3 gap-8 grid-rows-2 pt-24'>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={wholeHome} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Whole Home Remodeling</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={bathroomHero} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Bathrooms</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={kitchen} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Kitchens</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={deck} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Decks</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={basement} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Basements</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img className='w-96 h-64 border border-solid-1 border-gray-500 p-1 drop-shadow-xl' src={stone} />
                <a href={'#'} className='text-blue-500 font-bold hover:text-black'>Landscaping</a>
                <p className='text-gray-500 w-96'>Hashtag tbh shoreditch iceland vaporware raw denim blue bottle, sustainable cloud bread praxis. Ascot vegan kinfolk humblebrag cliche JOMO activated charcoal lyft fit celiac tattooed distillery tacos. Gluten-free mustache DIY, roof party chia four dollar toast raclette man braid sustainable. Farm-to-table taxidermy freegan celiac kogi.</p>
            </div>
        </div>
    </div>
  )
}
