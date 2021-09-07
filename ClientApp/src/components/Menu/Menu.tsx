import React from 'react'
import { Link } from 'react-router-dom'
import graph from './graph.svg'
import table from './table.svg'
import './menu.scss'

export default function Menu() {
    return (
        <section className='menu'>
            <div className='menu__container'>
                <Link to='/table'>
                    <img src={table} alt="table" />
                    <p>Таблица</p>
                </Link>
                <Link to='/graphs'>
                    <img src={graph} alt="graph" />
                    <p>Графики</p>
                </Link>
            </div>
        </section>
    )
}
