import React from 'react'

const SearchBar = () => {
  return (
    <form>
    <div className="relative">
      <input
        className="input input-bordered bg-transparent md:w-[200px] border-1 text-[var(--text-color)]"
        placeholder="Search ..."
        type="search"
      />
    </div>
  </form>
  )
}

export default SearchBar