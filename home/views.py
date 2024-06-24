from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

def login_view(request):
    if(request.method == "POST"):
        print('done')
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Login Successfully!')
            return JsonResponse({'status': 'success','url': reverse('profile')})
        else:
            return JsonResponse({'status': 'wrong'})
        
    if request.user.is_anonymous:
        return render(request, 'login.html')
    else:
        return redirect(reverse('profile'))
    

def profile(request):
    if request.user.is_anonymous:
        return redirect(reverse('login'))
    else:
        return render(request, 'profile.html')