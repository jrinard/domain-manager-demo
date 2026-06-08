import { useState } from 'react'

import { ComboBox, Tabs, TextHeading, Label } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { TextInput } from '@falcon/inputs'
import { useSimpleReducer } from '@spacedock/noonian'

const TABS = [
  { id: 'create', label: 'Create New User' },
  { id: 'add', label: 'Add Existing User' },
]

const FAKE_ROLES = [
  {
    value: 'Admin',
    item: <span>Admin</span>,
  },
  {
    value: 'Manager',
    item: <span>Manager</span>,
  },
  {
    value: 'Client Owner',
    item: <span>Client Owner</span>,
  },
  {
    value: 'Client Employee',
    item: <span>Client Employee</span>,
  },
]

const SimpleForm = () => {
  const [activeTab, updateActiveTab] = useState<string>('create')
  const { state, update } = useSimpleReducer({
    firstName: '',
    lastName: '',
    email: '',
    loginName: '',
    password: 'o6xVx5KM',
    role: 'Client Employee',
  })

  return (
    <section className="flex flex-col gap-4 p-4">
      <TextHeading>Create or Add New User</TextHeading>

      <Tabs
        items={TABS}
        selected={activeTab}
        ariaLabelBy="SimpleFormTab"
        onSelect={(id) => {
          updateActiveTab(`${id}`)
        }}
      />

      {activeTab === 'create' && (
        <div className="flex flex-row flex-wrap gap-2">
          <div className="flex grow basis-2/5 flex-col gap-1">
            <Label textType="body" htmlFor="firstName">
              First Name
            </Label>
            <TextInput
              id="firstName"
              placeholder="First Name"
              value={state.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
            />
          </div>
          <div className="flex grow basis-2/5 flex-col gap-1">
            <Label textType="body" htmlFor="lastName">
              Last Name
            </Label>
            <TextInput
              id="lastName"
              placeholder="Last Name"
              value={state.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
            />
          </div>
          <div className="flex grow basis-2/5 flex-col gap-1">
            <Label textType="body" htmlFor="email">
              Email
            </Label>
            <TextInput
              id="email"
              placeholder="example@example.com"
              value={state.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <div className="flex grow basis-2/5 flex-col gap-1">
            <Label textType="body" htmlFor="loginName">
              Login Name
            </Label>
            <TextInput
              id="loginName"
              placeholder="example"
              value={state.loginName}
              onChange={(e) => update({ loginName: e.target.value })}
            />
          </div>

          <div className="flex basis-full flex-col gap-1">
            <Label textType="body" htmlFor="password">
              Password
            </Label>
            <TextInput
              id="password"
              value={state.password}
              onChange={(e) => update({ password: e.target.value })}
            />
          </div>

          <div className="flex basis-2/5 flex-col gap-1">
            <Label textType="body" htmlFor="role">
              Security Role
            </Label>

            <ComboBox
              id="role"
              items={FAKE_ROLES}
              value={state.role}
              onChange={(newValue) => {
                update({ role: newValue })
              }}
            />
          </div>
          {/* <ComboBox /> */}

          <section className="flex w-full flex-row justify-end gap-4">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Create User</Button>
          </section>
        </div>
      )}
      {/* {activeTab === 'add' && <AddUserForm />} */}
    </section>
  )
}

export default SimpleForm
