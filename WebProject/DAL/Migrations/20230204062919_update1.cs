using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class update1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_Attachments_AttachmentId",
                table: "Countries");

            migrationBuilder.AlterColumn<int>(
                name: "AttachmentId",
                table: "Countries",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "52948b0d-d5c6-4681-98ef-209132c94d20", "AQAAAAIAAYagAAAAEHorUVE/IADM+YnOhTP5SviujtJJVYcXOi1hHnlK7oQU+cv4YX5BVrOlpUpB84k+BA==", "5790859c-b127-4c1b-965a-9034b198e90e" });

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_Attachments_AttachmentId",
                table: "Countries",
                column: "AttachmentId",
                principalTable: "Attachments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_Attachments_AttachmentId",
                table: "Countries");

            migrationBuilder.AlterColumn<int>(
                name: "AttachmentId",
                table: "Countries",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3e8c8dc0-3dfc-4fc6-9009-1474d3c0079a", "AQAAAAIAAYagAAAAEKWf67bhekcilHNmb3e0H1cmpnymWzY06n9KqM20JQEqP0NQ2LWDKU9Kykb94HCBRQ==", "64e2d376-291d-424a-8837-0c23f150fa47" });

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_Attachments_AttachmentId",
                table: "Countries",
                column: "AttachmentId",
                principalTable: "Attachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
