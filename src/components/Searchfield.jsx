export default function Searchfield({handleinput, filter}) {

    return (
        <input className="search" type="search" placeholder="Type to search ..." value={filter} onChange={handleinput} />
    )
}