import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import Link from 'next/link';

export const Container = styled.div.attrs({
  className: twMerge(
    'min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#13332b] to-transparent p-4'
  )
})``;

export const Card = styled.div.attrs({
  className: twMerge(
    'w-full max-w-md bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95'
  )
})``;

export const Title = styled.h1.attrs({
  className: twMerge(
    'text-3xl font-bold text-center text-gray-800 mb-2'
  )
})``;

export const Subtitle = styled.p.attrs({
  className: twMerge(
    'text-center text-gray-600 mb-8'
  )
})``;

export const Form = styled.form.attrs({
  className: twMerge(
    'space-y-6'
  )
})``;

export const InputGroup = styled.div.attrs({
  className: twMerge(
    'space-y-2'
  )
})``;

export const Label = styled.label.attrs({
  className: twMerge(
    'block text-sm font-medium text-gray-700'
  )
})``;

export const InputWrapper = styled.div.attrs({
  className: twMerge(
    'relative'
  )
})``;

export const Input = styled.input.attrs({
  className: twMerge(
    'w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-condatyGreen focus:ring-2 focus:ring-condatyGreen/20 outline-none transition-colors'
  )
})``;

export const IconButton = styled.button.attrs({
  className: twMerge(
    'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
  )
})``;

export const ErrorText = styled.span.attrs({
  className: twMerge(
    'text-sm text-red-600 flex items-center gap-1'
  )
})``;

export const Button = styled.button.attrs({
  className: twMerge(
    'w-full py-3 px-4 bg-condatyGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
  )
})``;

export const Alert = styled.div.attrs({
  className: twMerge(
    'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'
  )
})``;

export const Footer = styled.div.attrs({
  className: twMerge(
    'mt-6 text-center text-sm text-gray-600'
  )
})``;

export const FooterLink = styled(Link).attrs({
  className: twMerge(
    'text-condatyGreen hover:text-condatyGreen/80 font-medium'
  )
})``;