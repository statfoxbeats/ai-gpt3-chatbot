import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Text variant="h1">edit this</Text>
        <Text className="text-zinc-600">
you can edit this too
        </Text>
      </section>

      <section className="flex flex-col gap-3">
        <Text variant="h2">You can edit this also too</Text>
        <div className="lg:w-2/3">
          <Chat />
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
