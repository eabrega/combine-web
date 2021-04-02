<template>
    <div class="field-add-button">
        <b-button variant="success" v-b-modal.modal-1>Новое поле</b-button>
        <b-modal
            centered
            id="modal-1"
            size="lg"
            title="Добавление нового поля"
            ok-title="Сохранить"
            ok-variant="success"
            @ok="Submit"
            @show="Reset"
            cancel-title="Отмена"
            cancel-variant="danger"
        >
            <b-card bg-variant="light">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group>
                        <b-form-group
                            label="Название:"
                            label-for="name"
                            label-cols-sm="2"
                            label-align-sm="left"
                        >
                            <b-form-input
                                id="name"
                                :state="nameState"
                                @input="updateNameState"
                                v-model="$v.name.$model"
                            ></b-form-input>
                            <div v-if="nameState != null">
                                <div class="error" v-if="!$v.name.required">
                                    Обязательное поле.
                                </div>
                                <div class="error" v-if="!$v.name.minLength">
                                    Слишком короткое название.
                                </div>
                                <div class="error" v-if="!$v.name.maxLength">
                                    Слишком длинное название.
                                </div>
                            </div>
                        </b-form-group>
                        <b-form-group
                            label="ОКМО:"
                            label-for="code"
                            label-cols-sm="2"
                            label-align-sm="left"
                        >
                            <b-form-input
                                id="code"
                                type="number"
                                :state="codeState"
                                @input="updateCodeState"
                                v-model="$v.code.$model"
                            ></b-form-input>
                            <div v-if="codeState != null">
                                <div class="error" v-if="!$v.code.required">Обязательное поле!</div>
                                <div class="error" v-if="!$v.code.numeric">Только цифры!</div>
                            </div>
                        </b-form-group>

                        <b-form-group
                            label="Свойства:"
                            label-for="nested-city"
                            label-cols-sm="2"
                            label-align-sm="left"
                        >
                            <b-form-tags
                                placeholder=""
                                input-id="tags-basic"
                                v-model="tags"
                            ></b-form-tags>
                        </b-form-group>

                        <b-form-group label="Default:" label-cols-sm="2">
                            <b-form-file id="file-default"></b-form-file>
                        </b-form-group>
                    </b-form-group>
                </form>
            </b-card>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, numeric } from "vuelidate/lib/validators";

@Component
export default class FieldAddButton extends Vue {
    private readonly tags = ["Помидоры", "Автополив"];

    @Validate({
        required,
        minLength: minLength(5),
        maxLength: maxLength(100),
    })
    private name: string | null = null;

    @Validate({
        required,
        numeric,
    })
    private code: number | null = null;

    private nameState: boolean | null = null;
    private codeState: boolean | null = null;
    private submittedNames = new Array<string>();

    constructor() {
        super();
    }

    Submit(bvModalEvt: Event) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
    }

    Reset() {
        this.name = null;
        this.code = null;
        this.nameState = null;
        this.codeState = null;
    }

    private handleSubmit() {
        if (!this.checkFormValidity()) {
            return;
        }

        this.submittedNames.push(this.name ?? "");
        this.submittedNames.push(this.code?.toString() ?? "");
        // Hide the modal manually
        this.$nextTick(() => {
            this.$bvModal.hide("modal-1");
        });

        console.log(this.submittedNames);
    }

    private checkFormValidity() {
        this.codeState = !this.$v.code.$invalid;
        this.nameState = !this.$v.name.$invalid;
        return this.nameState && this.codeState;
    }

    updateCodeState() {
        this.codeState = !this.$v.code.$invalid;
    }

    updateNameState() {
        this.nameState = !this.$v.name.$invalid;
    }
}
</script>

<style scoped lang="scss">
.field-add-button {
    margin-bottom: 30px;
}
</style>
