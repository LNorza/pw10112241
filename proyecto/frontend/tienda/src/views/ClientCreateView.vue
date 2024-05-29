<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con éxito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" id="id" type="number" class="form-control" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class='errorValidacion' />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" id="nombre" type="text" class="form-control"
                            v-model="model.cliente.Name" />
                        <ErrorMessage name="nombre" class='errorValidacion' />
                    </div>
                    <div class="mb-3">
                        Apellido
                        <Field name="apellido" id="apellido" type="text" class="form-control"
                            v-model="model.cliente.Last_name" />
                        <ErrorMessage name="apellido" class='errorValidacion' />
                    </div>
                    <div class="mb-3">
                        Teléfono
                        <Field name="telefono" id="telefono" type="text" class="form-control"
                            v-model="model.cliente.telephone" />
                        <ErrorMessage name="telefono" class='errorValidacion' />
                    </div>

                    <div class="mb-3">
                        <button @click="guardarCliente" type="submit" class="btn btn-primary">Guardar</button>
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
    name: "AddCustomer",
    components: { Field, Form, ErrorMessage },

    data() {
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({ message: 'Sólo números' }).int(),
                Name: zod.string().min(1, { message: 'Requerido' }),
                last_name: zod.string().min(1, { message: 'Requerido' }),
                telephone: zod.string().regex(phoneRegex, 'Números no válido').min(10, { message: 'Minimo 10' }),
            })
        )
        return {
            validationSchema,
            mensaje: 0,
            model: {
                cliente: {
                    id: 0,
                    Name: '',
                    Last_name: '',
                    telephone: '',
                }
            }
        }
    },
    methods: {
        onTodoBien() {
            alert('Todo validado');
        },

        guardarCliente() {
            axios.post('http://localhost:3000/api/clientes', this.model.cliente)
                .then(res => {
                    if (res.data.affectedRows == 1) {
                        this.model.cliente = {
                            id: 0,
                            Name: '',
                            Last_name: '',
                            telephone: '',
                        }
                        //Para que salga el mensaje de éxito
                        this.mensaje = 1;
                    }
                })
        }
    }
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>