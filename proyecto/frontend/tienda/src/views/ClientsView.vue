<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Customers
                    <RouterLink to="/clients/new" class="btn btn-primary float-end">
                        Add
                    </RouterLink>
                </h4>
            </div>

            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <!-- *Header of te column -->
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Telephone</th>
                        <th>Actions</th>
                    </thead>

                    <tbody>
                        <tr v-for="(cliente, index) in clientes" :key="index">
                            <td>{{ cliente.id }}</td>
                            <td>{{ cliente.Name }}</td>
                            <td>{{ cliente.Last_name }}</td>
                            <td>{{ cliente.telephone }}</td>
                            <td> Update &nbsp; Delete</td>
                        </tr>
                    </tbody>



                </table>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {

    name: 'ClientsView',
    data() {
        return {
            clientes: [],

        }
    },

    mounted() {  //when the component is mounted
        this.getClientes()
    },

    // Todo: in console use npm install axios --save
    /*
     ! check the console.log first, next use the next line to check customer from API
    */

    methods: {
        getClientes() {
            axios.get('http://localhost:3000/api/clientes').then(
                response => {
                    // console.log(response);
                    this.clientes = response.data;
                }
            )
        }
    },
}
</script>