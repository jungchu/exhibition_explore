<template>
    <div id="contact">
        <Toolbar></Toolbar>
        <div id="contactContent">
            <div id="contactTitle">
                覓 巷 
                <span id="contactTitleEn"> MI XIANG </span>
            </div>

            <div id="contactHour">
                <div class="contactSubtitle"> 營業時間 </div>
                <div class="contactText"> 11:00 ~ 14:00 </div>
                <div class="contactText"> 17:00 ~ 21:00 </div>
                <div class="contactText"> (週一公休) </div>
            </div>

            <div id="contactPhone">
                <div class="contactSubtitle"> 聯絡電話 </div>
                <div class="contactText"> XXXX-XXXX </div>
            </div>

            <div id="contactMedia">
                <div 
                    class="contactIcon"
                    @click="goToPage('https://www.instagram.com')"
                >
                    <v-icon icon="mdi-instagram" />
                    <span class="tooltip"> IG 示意 </span>
                </div>

                <div 
                    class="contactIcon"
                    @click="goToPage('https://www.facebook.com')"
                >
                    <v-icon icon="mdi-facebook" />
                    <span class="tooltip"> FB 示意 </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Toolbar from './toolbar.vue';

const goToPage = (url) => {
    window.open(url, '_blank')
}

</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#contact {
    @include font-zh;
    width: 100%;
    height: 100%;
    padding: 180px 0;
    color: white;

    #contactContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        #contactTitle {
            font-size: 28px;

            #contactTitleEn {
                // @include font-en;
            }
        }

        #contactHour {
            margin: 15px 0;
            text-align: center;
        }

        #contactPhone {
            margin: 15px 0;
            text-align: center;
        }

        #contactMedia {
            display: flex;
            margin: 15px 0;

            .v-icon {
                cursor: pointer;
            }

            .contactIcon {
                position: relative;
                margin: 0 10px;

                .tooltip {
                    visibility: hidden;
                    position: absolute;
                    top: 108%;
                    left: 50%;
                    margin-left: -30px; // 置中 tooltip (width/2 = 30)
                    z-index: 1;
                
                    width: 60px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 6px;
                    padding: 5px 0;
                }
            }

            .contactIcon:hover .tooltip {
                visibility: visible;
            }
        }

        .contactSubtitle {
            margin-bottom: 5px;
            font-size: 20px;
        }
    }
}

</style>
