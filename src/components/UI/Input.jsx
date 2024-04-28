export default function Input({id, label, ...props}) { //input komponenta, jer ćemo imati podosta inputa
    return (
        <p className="input-control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props}/>
        </p>
    )
}