<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar clientes</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="md-3">
                        ID
                        <Field name="id" id="id" class="form-control" type="number" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        Nombre
                        <Field name="nombre" id="nombre" class="form-control" type="text"
                            v-model="model.cliente.Name" />
                        <ErrorMessage name="nombre" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        Apellidos
                        <Field name="apellido" id="apellido" class="form-control" type="text"
                            v-model="model.cliente.Last_name" />
                        <ErrorMessage name="apellido" class="errorValidation" />
                    </div>
                    <div class="md-3">
                        Telefono
                        <Field name="delefono" id="telefono" class="form-control" type="text"
                            v-model="model.cliente.telephone" />
                        <ErrorMessage name="telefono" class="errorValidation" />
                    </div>
                    <p></p>
                    <div class="md-3">
                        <button @click='guardarCliente' type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default {
    name: "EditCustomer",
    components: { Field, Form, ErrorMessage },
    data() {
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({ message: 'Sólo números' }).int(),
                Name: zod.string().min(1, { message: 'Requerido' }),
                Last_name: zod.string().min(1, { message: 'Requerido' }),
                telephone: zod.string().regex(phoneRegex, 'Números no válido').min(10, { message: 'Minimo 10' }),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                cliente: {
                    id: '',
                    Name: '',
                    Last_name: '',
                    telephone: '',
                }
            }
        }
    },
    mounted() {
        this.getCliente(this.$route.params.id);
    },
    methods: {
        getCliente(clienteID) {
            axios.get('http://localhost:3000/api/clientes/' + clienteID).then(res => {
                this.model.cliente = res.data[0];
                // this.model.cliente.id = res.data[0].id;
                // this.model.cliente.nombre = res.data[0].nombre;
            })
        },
        onTodoBien() {
            alert('Todo bien');
            this.guardarCliente();
        },
        guardarCliente() {
            try {
                axios.put('http://localhost:3000/api/clientes/' + this.$route.params.id,
                    this.model.cliente).then(res => {
                        if (res.data.affectedRows == 1) {// si inesetamos 1 registros
                            //limpiar el cuadro de textos
                            this.model.cliente = {
                                id: '',
                                Name: '',
                                Last_name: '',
                                telephone: '',
                            }
                            //Para que salga el mensaje de éxito
                            this.mensaje = 1;
                        }
                    });
            } catch (error) {
                console.log('Error al guardar cliente');
            }
        }
    }
}
</script>
<style scoped>
.errorValidation {
    color: red;
    font-weight: bold;
}
</style>
