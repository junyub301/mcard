import Text from '@shared/Text'
import Button from '@shared/Button'
import './App.css'
import Input from '@shared/Input'
import TextField from './components/shared/TextField'
import Alert from './components/shared/Alert'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text color="blue" typography="t2">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <div style={{ height: 10, width: '100%' }} />
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak>
        클릭해주세요
      </Button>
      <Button color="error" weak>
        클릭해주세요
      </Button>
      <Button full>클릭해주세요</Button>
      <Button disabled full>
        클릭해주세요
      </Button>

      <div style={{ height: 10, width: '100%' }} />

      <Input placeholder="로그인" />
      <Input aria-invalid />
      <div style={{ height: 10, width: '100%' }} />

      <TextField label="아이디" hasError />
      <TextField label="패스워드" />

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요.',
            onButtonClick: () => {},
          })
        }}
      >
        Alert 오픈{' '}
      </Button>
    </div>
  )
}

export default App
