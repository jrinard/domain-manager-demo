import { Link } from 'react-router-dom'
import { TextBody, TextHeading } from '@spacedock/falcon-ui'
import * as React from 'react'

const CannotView = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <TextHeading className="mx-auto w-full max-w-[900px]">
        You do not have permission to view this page, as there are no Domains
        you have permission to edit.
      </TextHeading>
      <TextBody className="mx-auto w-full max-w-[800px]">
        If you feel this is a mistake you may navigate to the{' '}
        <Link to="/">Home Page</Link>
        and then to the Domain Manager from there. If you recently logged back
        in after returning to the site you may be able to try again by
        <a href="/x/domain-manager">following this link</a>.
      </TextBody>
    </div>
  )
}

export default CannotView
