import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const loadUser = async () => {
    const req = await fetch('https://randomuser.me/api/?results=8')
      .then( res => res.json()).then( res => res.results) 
      return req;
  }

  const{data, isLoading, isSuccess} = useQuery('key', loadUser) 
  if (isLoading){
    return <View>
      
      <Text>isLoading</Text>

    </View>
  } else if (isSuccess){

  return <View style={styles.container}>
      <Text style={styles.titulo}>Usuários</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.line}>
              <Image
                source={{ uri: item.picture.thumbnail }}
                style={styles.avatar}
              />
              <View style={styles.info}>
              <Text style={styles.email}>
                  {item.name.first} {item.name.last}
                </Text>
                <Text style={styles.name}>{item.email}</Text>
                <Text>{item.phone}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.email}
        />
      </View>
  }
  
}
const QueryProvider = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client = {queryClient}><App/></QueryClientProvider>
  )
}

export default QueryProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
    padding: 8,
  },
  line: {
    height: 60,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    alignSelf: 'center',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 12,
  },
  email: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#E0FFFF',
    marginTop: 8
  }
});
