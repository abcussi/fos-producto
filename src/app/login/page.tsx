'use client';
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/authContext";
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const Container = styled.div.attrs({
  className: twMerge(
    'min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#13332b] to-transparent p-4'
  )
})``;

const Card = styled.div.attrs({
  className: twMerge(
    'w-full max-w-md bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95'
  )
})``;

const Title = styled.h1.attrs({
  className: twMerge(
    'text-3xl font-bold text-center text-gray-800 mb-2'
  )
})``;

const Subtitle = styled.p.attrs({
  className: twMerge(
    'text-center text-gray-600 mb-8'
  )
})``;

const Form = styled.form.attrs({
  className: twMerge(
    'space-y-6'
  )
})``;

const InputGroup = styled.div.attrs({
  className: twMerge(
    'space-y-2'
  )
})``;

const Label = styled.label.attrs({
  className: twMerge(
    'block text-sm font-medium text-gray-700'
  )
})``;

const InputWrapper = styled.div.attrs({
  className: twMerge(
    'relative'
  )
})``;

const Input = styled.input.attrs({
  className: twMerge(
    'w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-condatyGreen focus:ring-2 focus:ring-condatyGreen/20 outline-none transition-colors'
  )
})``;

const IconButton = styled.button.attrs({
  className: twMerge(
    'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
  )
})``;

const ErrorText = styled.span.attrs({
  className: twMerge(
    'text-sm text-red-600 flex items-center gap-1'
  )
})``;

const Button = styled.button.attrs({
  className: twMerge(
    'w-full py-3 px-4 bg-condatyGreen text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
  )
})``;

const Alert = styled.div.attrs({
  className: twMerge(
    'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'
  )
})``;

const Footer = styled.div.attrs({
  className: twMerge(
    'mt-6 text-center text-sm text-gray-600'
  )
})``;

const FooterLink = styled(Link).attrs({
  className: twMerge(
    'text-condatyGreen hover:text-condatyGreen/80 font-medium'
  )
})``;

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, 'Tiene que tener más de 6 caracteres')
      .matches(/[a-zA-Z]/, 'Tiene que tener al menos una letra')
      .required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setLoginError('');
        await login(values.email, values.password);
      } catch (error: any) {
        setLoginError(error.message || 'Error al iniciar sesión');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <Card>
        <Title>¡Bienvenido!</Title>
        <Subtitle>Inicia sesión para continuar</Subtitle>
        
        <Form onSubmit={formik.handleSubmit}>
          {loginError && (
            <Alert role="alert">
              {loginError}
            </Alert>
          )}
          
          <InputGroup>
            <Label htmlFor="email">
              Correo electrónico
            </Label>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                {...formik.getFieldProps('email')}
              />
            </InputWrapper>
            {formik.touched.email && formik.errors.email && (
              <ErrorText>{formik.errors.email}</ErrorText>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">
              Contraseña
            </Label>
            <InputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                {...formik.getFieldProps('password')}
              />
              <IconButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputWrapper>
            {formik.touched.password && formik.errors.password && (
              <ErrorText>{formik.errors.password}</ErrorText>
            )}
          </InputGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Form>

        <Footer>
          ¿No tienes una cuenta?{' '}
          <FooterLink href="/register">
            Regístrate aquí
          </FooterLink>
        </Footer>
      </Card>
    </Container>
  );
}