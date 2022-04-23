import { useEffect, useState } from 'react'
import { prominent } from 'color.js'

interface Props {
    picture: string;
    children: JSX.Element[]
}
export const CardBackground = ({ picture, children }: Props) => {
    const [color, setColor] = useState<string>('#a7a7a7');

    const colors1 = (picture: string) => {
        return prominent(picture, { format: 'hex', sample: 30 }).then(color => color[1].toString())
    }

    useEffect(() => {
        colors1(picture).then((result => {
            setColor(result);
        })).catch(err => console.error(err));
        return () => {
            setColor('');
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div className='col s3' style={{
            background: color,
            color: '#000',
            minWidth: '100%',
            height: '150px',
            borderRadius: '15px',
            margin: '5px',
            padding: '4px',
            position: 'relative',
            boxShadow: '5px 5px 7px -5px #000000'
        }} >
            {children}
        </div>
    )
}
