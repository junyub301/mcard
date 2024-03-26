import Text from '@shared/Text'
import Button from '@shared/Button'
import './App.css'

function App() {
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
      <div style={{ height: 10, width: '100%' }}>
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
      </div>
    </div>
  )
}

export default App
