<div id="time">
    Graph for time period vrs task length vrs skills available
    <whiteframe>
        <div>
            <list>
                <list-item>
                    <table v-if="members.length > 0">
                        <table-header>
                            <table-row>
                                <table-head>Name</table-head>
                                <table-head tooltip="We'll send them an invite">Email</table-head>
                                <table-head>Role</table-head>
                            </table-row>
                        </table-header>

                        <table-body>
                            <table-row v-for="(position, index) in members" :key="index">
                                <table-cell>{{position.name}}</table-cell>
                                <table-cell>{{position.email}}</table-cell>
                                <table-cell>{{position.role}}</table-cell>
                            </table-row>
                        </table-body>
                    </table>
                </list-item>
            </list>
        </div>
    </whiteframe>
</div>
<script src='team.ts'>
</script>
