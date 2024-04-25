//ovdje passamo children prop jer ćemo Button komponentom wrappati druge komponente, samim time joj prenjeti sadržaj
//pomoću "...props" ćemo automatski prebaciti sve ostale propse koje odredimo u komponentama gdje ćemo callati ovu komponentu 
export default function Button({children, textOnly, className="", ...props}) { 
    //ukoliko prenesemo textOnly prop znači da button mora sadržavati isključivo textualnu vrijednost
    let cssClasses = textOnly ? 'text-button' : 'button';

    return(
        <button className={cssClasses} {...props} >{children}</button>

    )
}