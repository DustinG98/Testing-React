import axios from 'axios'
import React from 'react'

import * as rtl from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import App from './App'


jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: [{name: "Luke", url: "https://swapi.co/api/people/1/"}, {name: "C-3PO", url: "https://swapi.co/api/people/2/"}]
            }
        }))
    }
})

afterEach(rtl.cleanup)

//makes api call on initial render
test("Made API Call", async () => {
    const wrapper = rtl.render(<App/>)

    await wrapper.findAllByTestId("character")

    expect(axios.get).toHaveBeenCalled()
})

//next button makes an api call and displays characters
test("Next Page makes an api call", async () => {
    const wrapper = rtl.render(<App/>)

    const next = wrapper.getByText(/next/i)
    rtl.act(() => {
        rtl.fireEvent.click(next)
    })
    expect(axios.get).toHaveBeenCalled()
    const characters = await wrapper.findAllByTestId("character")
    expect(characters).not.toBeNull()
})

//previous button makes an api call and displays characters
test("Previous Page makes an api call when on the second page", async () => {
    const wrapper = rtl.render(<App/>)

    const next = wrapper.getByText(/next/i)
    const previous = wrapper.getByText(/previous/i)

    rtl.act(() => {
        rtl.fireEvent.click(next)
        rtl.fireEvent.click(previous)
    })
    expect(axios.get).toHaveBeenCalled()
    const characters = await wrapper.findAllByTestId("character")
    expect(characters).not.toBeNull()
})


//select triggers api call on value change
test("select triggers api call", async () => {
    const wrapper = rtl.render(<App/>)

    const select = await wrapper.findByTestId('select')
    await rtl.act(async () => {
        rtl.fireEvent.change(select, { target: {value: 'starships'} })
    })
    expect(axios.get).toHaveBeenCalled()
})