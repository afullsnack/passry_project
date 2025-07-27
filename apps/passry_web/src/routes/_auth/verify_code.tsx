import { Container, Main, Section } from '@/components/craft'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/verify_code')({
  component: VerifyCode,
})

function VerifyCode() {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Verify Code Hero</h1>
        </Container>
        <Container>
          <h1>Verify Code Form</h1>
        </Container>
      </Section>
    </Main>
  )
}
