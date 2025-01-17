"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useAuth } from "@/app/hooks/useAuth";

const ErrorMessage = styled.div`
    color: #ff0000; /* o # */
`;

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  background-image: var(--Gradient,linear-gradient(180deg,#13332b 0,rgba(37,37,37,0) 100%));
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
`;

const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      border-color: #00e38c;
      outline: none;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #00e38c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, 'Tiene que tener mas de 6 carcateres.')
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
      await login(values.email, values.password);
    },
  });

  return (
    <OuterContainer>
      <FormCard>
        <Title>Iniciar sesión</Title>
        <form onSubmit={formik.handleSubmit}>
          <FieldsContainer>
            <FieldWrapper>
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              )}
            </FieldWrapper>
          </FieldsContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </SubmitButton>
        </form>
      </FormCard>
    </OuterContainer>
  );
}
