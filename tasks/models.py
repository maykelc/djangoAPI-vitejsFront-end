from django.db import models

# Create your models here.


class Task(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank = True)
    hecho = models.BooleanField(default= False)
    
    #aca le indico el nombre que quiero que aparesca en la tabla
    def __str__(self) :
        return self.titulo
    
class login(models.Model):
    usuario = models.CharField(max_length=200)
    clave =models.CharField(max_length=50)


    #aca le indico el nombre que quiero que aparesca en la tabla