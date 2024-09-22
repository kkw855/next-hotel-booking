// noinspection JSUnusedGlobalSymbols

import { ImageResponse } from 'next/og'

import { FaBed } from 'react-icons/fa'

export const size = {
  width: 18,
  height: 18,
}
export const contentType = 'image/svg+xml'

const Icon = () => {
  return new ImageResponse(<FaBed color="#2A7CEA" />, {
    ...size,
  })
}

export default Icon
