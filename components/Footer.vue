<script lang="ts">
</script>

<template>
    <div class="footer">
        <div class="container">
            <div class="footer-body">
                <div class="footer-title">phone.</div>
                <p class="footer-info">Phone number from backend</p>
            </div>
            <div class="footer-body">
                <div class="footer-title">email.</div>
                <p class="footer-info">Email from backend</p>
            </div>
            <div class="footer-body">
                <div class="footer-title">follow me.</div>
                <p class="footer-info">Links from backend</p>
            </div>
            <div class="footer-body" style="grid-row: 2; grid-column: 2; justify-content: center;">
                <p class="footer-info">© 2035 by Lirije Shabani.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/mixins.scss';

.footer {
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
   .container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

        @include sm {
            position: relative;
            bottom: 0;
            left: 0;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr 30px;
            align-items: center;
            padding: 10px;
        }

        @include lg {
            position: relative;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px;

            .footer-body {
                &:last-child {
                    align-self: center;
                }
            }
        }

        .footer-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .footer-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            
            .footer-info {
                font-size: 12px;
                font-weight: 300;
            }
        }
   }
}
</style>