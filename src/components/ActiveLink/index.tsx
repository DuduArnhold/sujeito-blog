
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps{
    children: ReactElement;
    activeClassName: string;
}


export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps){
    const { asPath } = useRouter();  // Se estiver na pag de conteudos /posts
    const className  = asPath === rest.href ? activeClassName : '';  /// se a rota ou pagina q o usuario acessou for igual ao link q ele clicou ativamos o classname


return(
        
        <Link { ...rest }>
            {cloneElement(children, {
                className
            })}
        </Link>

    )
}