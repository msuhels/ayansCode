import React from 'react'
import { Link } from 'react-router-dom'

function TopHeader() {
  return (
    <>
      <header  className="bg-white shadow-sm lg:static lg:overflow-y-visible">
        <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div  className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
            <div  className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
              <div  className="flex-shrink-0 flex items-center">
                <Link to="#">
                  <img  className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500" alt="Workflow" />
                </Link>
              </div>
            </div>
            <div  className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div  className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <div  className="w-full">
                  <label htmlFor="search"  className="sr-only">Search</label>
                  <div  className="relative">
                    <div  className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg  className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input id="search" name="search"  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm" placeholder="Search" type="search" />
                  </div>
                </div>
              </div>
            </div>

            <div  className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <Link to="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Sign in </Link>
              <Link to="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign up </Link>
            </div>
          </div>
        </div>

      </header>

    </>
  )
}

export default TopHeader
