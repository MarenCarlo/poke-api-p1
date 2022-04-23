import { Fragment, useEffect, useState } from 'react';
import { Typography, Image } from 'antd';
import { NavBar } from '../layout/NavBar';
import { CardBackground } from '../layout/CardBackground';

import axios from 'axios';

const APIPoke = () => {
    interface SimplePokemon {
        id: string;
        name: string;
        picture: string;
        color?: string;
    }
    interface Result {
        name: string;
        url: string;
    }
    const { Title } = Typography;
    const changeWordToUpperCase = (name: string): string => {
        return name?.charAt(0)?.toUpperCase() + name?.slice(1);
    }
    let [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const getPokemons = async () => {
        const numOffset = Math.floor(Math.random() * (1126 - 6));
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + numOffset + '&limit=6');
        mapPokemonList(data.results);
        console.log(data.results)
    }

    const mapPokemonList = async (pokemonList: Result[]) => {
        const newPokemonList: SimplePokemon[] = await pokemonList.map(({ name, url }) => {
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return { id, picture, name }
        })
        setSimplePokemonList([...newPokemonList]);
        console.log(newPokemonList)
    }

    useEffect(() => {
        getPokemons()
        // eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            <NavBar />
            <>
                <div className='row'>
                    {
                        simplePokemonList.map((pokemon) => {

                            return (
                                <div
                                    key={pokemon.id}
                                    className='container'
                                >
                                    <div className='col s12 m6'>
                                        <CardBackground picture={pokemon?.picture}>
                                            <div style={{ width: '90px', height: '150px', position: 'absolute', bottom: 0, right: 50 }}>
                                                <Image
                                                    preview={{ visible: false }}
                                                    width={'100%'}
                                                    height={'100%'}
                                                    src={pokemon?.picture}
                                                />
                                            </div>
                                            <div style={{ paddingLeft: 10, width: '160px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                                <Title
                                                    level={1}
                                                    style={{
                                                        margin: 0,
                                                        color: 'black',
                                                        fontSize: '1.5em'
                                                    }}>
                                                    {changeWordToUpperCase(pokemon.name)}
                                                </Title>
                                                <div style={{ color: 'black' }}>
                                                    <Title level={4} style={{ margin: 0, width: 80 }}>#{pokemon.id}</Title>
                                                </div>

                                            </div>
                                        </CardBackground>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        </Fragment>
    );
}

export default APIPoke;