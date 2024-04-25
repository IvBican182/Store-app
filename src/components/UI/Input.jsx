export default function Input({id, label, ...props}) {
    return (
        <p className="input-control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...props}/>
        </p>
    )
}