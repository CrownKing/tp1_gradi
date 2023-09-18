import Sidebar from "../layout/sidebar";
import { DashIcon, HomeIcon, UploadIcon } from '../assets/icons'
import { Route, Routes } from "@solidjs/router";
import { For } from "solid-js";
import Home from "./organisms/Home";
import Dashboard from "./organisms/Dashboard";
import Integracoes from "./organisms/Integracoes";
import { StoreProvider } from "./store";


//Import Dynamo
import * as AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'dynamodb.us-east-2.amazonaws.com',
    accessKeyId: ['KEYID'],
    secretAccessKey: ['ACCESSKEY']
  });

  const onRead = () => {
    
    var dynamodB = new AWS.DynamoDB();
    var docClient = new AWS.DynamoDB.DocumentClient();
    
        let that = this;
        let params = {
            TableName: "gradi"
        };
    
        docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
        //     that.setState({
        //         gridData: data
        // })
        console.log({data})
        }
    });
    };
    onRead()

export const routes = [
    { path: '/home', icon: HomeIcon, tilte: "Home", import: Home },
    { path: '/dashboard', icon: DashIcon, tilte: "Dashboard", import: Dashboard },
    { path: '/integracoes', icon: UploadIcon, tilte: "Integrações", import: Integracoes }
]

export default function App() {
    return (
        <StoreProvider>
            <div class="h-full flex">
                <Sidebar />
                <main>
                <Grid data={this.state.gridData}>
        // Grid columns
    </Grid>
                    <Routes>
                        <For each={routes}>
                            {route => (
                                <Route path={route.path} component={route.import} />
                            )}
                        </For>
                    </Routes>
                </main>
            </div>
        </StoreProvider>
    )
}